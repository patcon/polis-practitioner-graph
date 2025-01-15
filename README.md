# Polis Practitioners Explorer

An attempt to visualize and make more discoverable the network of people who work with 
Polis-like tools and processes in various capacities.

This resource is generated from [a quasi-public spreadsheet directory of
persons and orgs][spreadsheet]. I will share access liberally on request, but for now it won't be
fully public.

   [spreadsheet]: https://docs.google.com/spreadsheets/d/1Mji1P51Q3FDWIis_F9NlrW980OtNiF9Ko5NNE3vf42I/edit?gid=1063028090

## Roadmap
- [x] MVP showing network of relationships and players.
- [ ] Autogenerate from GitHub Action.
- [ ] Add popup showing info on each entry (social media, linkedin, location, etc.)
- [ ] Link to reference for each entry being in network.
- [ ] Highlight people in "Polis Practitioner" list.
- [ ] Highlight people in "Polis-curious" list.
- [ ] Highlight people by location.
- [ ] Highlight people in the Polis User Group discord ([discord invite][])
- [ ] Add connections with strength based on social media interactions
    - [ ] Twitter mentions
    - [ ] Twitter follows
    - [ ] Bluesky mentions
    - [ ] Bluesky follows

   [discord invite]: https://discord.com/invite/wFWB8kzQpP

## Development

```
# 1. [Optional] Download CSV and rename to `polis-practitioners.csv`.
# 2. [Optional] Generate `graph_data.json` from CSV.
python generate_json.py
# 3. [Optional] Manually remove any JSON items with `NaN` values to avoid JS errors.
# 4. Serve page locally.
python -m http.server 9000
```

View the page at http://localhost:9000

## Acknowledgements

Code stub genenerated via ChatGPT.
