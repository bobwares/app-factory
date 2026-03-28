SHELL := /bin/bash

ROOT_DIR := $(abspath .)
IMPLEMENTATIONS_DIR ?= $(ROOT_DIR)/tech-stack-implementations
PROFILE_FILES := $(shell find tech-stack-profiles -type f -name '*.yaml' -print | LC_ALL=C sort)
PROFILE_REFS := $(patsubst tech-stack-profiles/%.yaml,%,$(PROFILE_FILES))

.DEFAULT_GOAL := help

.PHONY: help profiles start $(foreach profile,$(PROFILE_REFS),start-$(subst /,-,$(profile)))

define run_profile
	@set -euo pipefail; \
	input="$(1)"; \
	if [ -z "$$input" ]; then \
		printf 'PROFILE is required. Use `make profiles` to see the available options.\n' >&2; \
		exit 1; \
	fi; \
	if printf '%s\n' $(PROFILE_REFS) | grep -Fx -- "$$input" >/dev/null; then \
		profile_ref="$$input"; \
	else \
		matches="$$(printf '%s\n' $(PROFILE_REFS) | awk -F/ -v needle="$$input" '$$NF == needle { print $$0 }')"; \
		match_count="$$(printf '%s\n' "$$matches" | sed '/^$$/d' | wc -l | tr -d ' ')"; \
		if [ "$$match_count" = "1" ]; then \
			profile_ref="$$matches"; \
		elif [ "$$match_count" = "0" ]; then \
			printf 'Unknown profile: %s\n' "$$input" >&2; \
			exit 1; \
		else \
			printf 'Ambiguous short profile name: %s\n' "$$input" >&2; \
			printf 'Matches:\n%s\n' "$$matches" >&2; \
			exit 1; \
		fi; \
	fi; \
	profile_kind="$${profile_ref%%/*}"; \
	profile_name="$${profile_ref##*/}"; \
	kinded_dir="$(IMPLEMENTATIONS_DIR)/$$profile_kind/$$profile_name"; \
	flat_dir="$(IMPLEMENTATIONS_DIR)/$$profile_name"; \
	if [ -d "$$kinded_dir" ]; then \
		implementation_dir="$$kinded_dir"; \
	elif [ -d "$$flat_dir" ]; then \
		implementation_dir="$$flat_dir"; \
	else \
		printf 'Implementation for %s was not found.\n' "$$profile_ref" >&2; \
		printf 'Expected one of:\n  %s\n  %s\n' "$$kinded_dir" "$$flat_dir" >&2; \
		exit 1; \
	fi; \
	printf 'Starting %s from %s\n' "$$profile_ref" "$$implementation_dir"; \
	if [ -f "$$implementation_dir/Makefile" ]; then \
		$(MAKE) -C "$$implementation_dir" start; \
	elif [ -x "$$implementation_dir/scripts/start.sh" ]; then \
		"$$implementation_dir/scripts/start.sh"; \
	elif [ -x "$$implementation_dir/start.sh" ]; then \
		"$$implementation_dir/start.sh"; \
	elif [ -f "$$implementation_dir/docker-compose.yml" ] || [ -f "$$implementation_dir/docker-compose.yaml" ] || [ -f "$$implementation_dir/compose.yml" ] || [ -f "$$implementation_dir/compose.yaml" ]; then \
		compose_file=""; \
		for candidate in docker-compose.yml docker-compose.yaml compose.yml compose.yaml; do \
			if [ -f "$$implementation_dir/$$candidate" ]; then \
				compose_file="$$candidate"; \
				break; \
			fi; \
		done; \
		docker compose -f "$$implementation_dir/$$compose_file" up --build; \
	elif [ -f "$$implementation_dir/pom.xml" ]; then \
		if [ -x "$$implementation_dir/mvnw" ]; then \
			(cd "$$implementation_dir" && ./mvnw spring-boot:run); \
		else \
			(cd "$$implementation_dir" && mvn spring-boot:run); \
		fi; \
	elif [ -f "$$implementation_dir/package.json" ] && [ -f "$$implementation_dir/pnpm-lock.yaml" ]; then \
		(cd "$$implementation_dir" && pnpm start 2>/dev/null || pnpm dev); \
	elif [ -f "$$implementation_dir/package.json" ] && [ -f "$$implementation_dir/yarn.lock" ]; then \
		(cd "$$implementation_dir" && yarn start 2>/dev/null || yarn dev); \
	elif [ -f "$$implementation_dir/package.json" ]; then \
		(cd "$$implementation_dir" && npm run start 2>/dev/null || npm run dev); \
	else \
		printf 'No supported start entrypoint was found in %s.\n' "$$implementation_dir" >&2; \
		printf 'Provide one of: Makefile:start, scripts/start.sh, start.sh, a compose file, pom.xml, or package.json.\n' >&2; \
		exit 1; \
	fi
endef

help:
	@printf '%s\n' \
		'Root tech-stack implementation launcher' \
		'' \
		'Usage:' \
		'  make profiles' \
		'  make start PROFILE=backend/container-java-springboot' \
		'  make start PROFILE=container-java-springboot' \
		'  make start-backend-container-java-springboot' \
		'' \
		'Primary path: ./tech-stack-implementations/<kind>/<name>' \
		'Fallback path: ./tech-stack-implementations/<name>'

profiles:
	@printf 'Available tech-stack profiles:\n'; \
	printf '%s\n' $(PROFILE_REFS) | while read -r profile; do \
		printf '  %-72s -> tech-stack-implementations/%s\n' "$$profile" "$$profile"; \
	done

start:
	$(call run_profile,$(PROFILE))

$(foreach profile,$(PROFILE_REFS),$(eval start-$(subst /,-,$(profile)): ; $$(call run_profile,$(profile))))
