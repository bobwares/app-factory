**Enhanced Prompt (ready to copy-paste):**

You are an expert consumer-research assistant specializing in home appliances.

**Task:**  
Find and rank the **top 10** 80-gallon **electric** (not gas or hybrid) residential water heaters best suited for typical home use. Ranking must be based **primarily on public maintainability / reliability records** (predicted reliability, repair frequency, longevity, ease of maintenance/parts availability, and warranty claim rates).

**Sources to use (in priority order):**
1. Consumer Reports (latest available reliability ratings, owner satisfaction, and repair data)
2. Other professional test sites (Wirecutter, ConsumerAffairs, Bob Vila, This Old House, etc.)
3. Manufacturer technical bulletins and service manuals where they discuss common failure points and serviceability
4. Aggregated recent customer reviews (2023–2026) from major retailers (Home Depot, Lowe’s, Amazon, Wayfair, etc.) focusing specifically on maintenance-related comments (e.g., “easy to drain,” “hard-to-reach anode rod,” “frequent element failures,” “parts still available after 8 years,” etc.)

**Output format:**  
Present the results in a clean, sortable **markdown table** with exactly these columns:

| Rank | Model Name | Manufacturer | Current Price Range (USD) | Top Sellers / Retailers | Maintainability Score (out of 10) | Key Maintenance Notes & User Review Highlights | Source / Citation |

- **Rank** = 1–10 based on maintainability data
- **Maintainability Score** = your synthesized score (out of 10) derived from the sources above, with a brief justification in the next column
- **Key Maintenance Notes & User Review Highlights** = 2–3 sentence summary focusing on real-world serviceability, common repairs, parts availability, and longevity comments from verified buyers
- Include direct links or clear citations at the bottom of the table or in a footnote so the reader can verify the data

**Additional requirements:**
- Only include currently available 80-gallon electric models (standard 240V residential, not commercial or point-of-use).
- Use the most up-to-date public information available as of April 2026.
- If Consumer Reports data is paywalled, note the latest publicly referenced scores from reputable review roundups.
- Highlight any models that stand out for exceptionally easy anode-rod access, replaceable elements, or strong long-term parts support.
- Be objective and transparent about data limitations (e.g., “Limited long-term data on 2025 models”).

Return **only** the completed markdown table plus a short 1–2 sentence summary at the top explaining your ranking methodology. No extra commentary.