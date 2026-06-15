# TV-First Year Wave Manifest Status

**Updated UTC:** 2026-06-15T04:17:45Z
**Status:** PASS_HELD_MANIFESTS_CREATED

## Operating Rule

TV shows are higher priority than movies when concurrent work is unsafe. TV waves are ordered by active/last-season year descending, then movie waves are ordered by release year descending.

## Safety

- Publishes to Plex: false
- Starts expansion: false
- Modifies ScarFLIX: false
- Requires Materialized QA PASS before execution: true
- PAUSE_PUBLICATION remains required until delivery gates pass

## Counts

- TV candidates: 166
- Movie candidates: 104
- TV waves: 6
- Movie waves: 44
- TV zero-byte risk candidates: 0
- Movie zero-byte risk candidates: 0

## Held Waves

- tv_last_season_2025_whole_show: 16 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- tv_last_season_2024_whole_show: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- tv_last_season_2020_whole_show: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- tv_last_season_2018_whole_show: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- tv_last_season_1997_whole_show: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- tv_metadata_enrichment_required: 144 candidates, state=HELD_METADATA_ENRICHMENT_REQUIRED, zero-byte-risk=0
- movies_release_2026: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2025: 7 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2024: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2023: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2021: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2020: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2019: 5 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2018: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2017: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2016: 8 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2015: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2014: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2013: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2012: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2011: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2010: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2009: 8 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2008: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2007: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2006: 5 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2005: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2004: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2003: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2002: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2001: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_2000: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1998: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1997: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1996: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1995: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1994: 3 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1993: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1992: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1990: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1987: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1986: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1984: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1982: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1970: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1962: 2 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1960: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1958: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_release_1952: 1 candidates, state=HELD_QA_GATE_REQUIRED, zero-byte-risk=0
- movies_metadata_enrichment_required: 2 candidates, state=HELD_METADATA_ENRICHMENT_REQUIRED, zero-byte-risk=0

## Next Safe Action

Run cached TV metadata enrichment locally, then execute TV-first held waves only after Materialized QA and playback gates pass.
