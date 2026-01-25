package com.hiphoproster.controller;

import com.hiphoproster.model.Artist;
import com.hiphoproster.service.ArtistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bulk")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BulkImportController {

    private final ArtistService artistService;

    @PostMapping("/import-json")
    public ResponseEntity<?> importFromJson(@RequestBody List<Map<String, Object>> artistsData) {
        try {
            List<Artist> createdArtists = new ArrayList<>();
            List<String> errors = new ArrayList<>();

            for (int i = 0; i < artistsData.size(); i++) {
                try {
                    Map<String, Object> data = artistsData.get(i);
                    Artist artist = new Artist();

                    // Required fields
                    if (data.get("name") == null || data.get("name").toString().trim().isEmpty()) {
                        errors.add("Row " + (i + 1) + ": Name is required");
                        continue;
                    }

                    artist.setName((String) data.get("name"));
                    artist.setBio(data.get("bio") != null ? (String) data.get("bio") : null);
                    artist.setLyricism(data.get("lyricism") != null ? (String) data.get("lyricism") : null);
                    artist.setFlow(data.get("flow") != null ? (String) data.get("flow") : null);
                    artist.setCreativity(data.get("creativity") != null ? (String) data.get("creativity") : null);
                    artist.setRhythm(data.get("rhythm") != null ? (String) data.get("rhythm") : null);
                    artist.setLongevity(data.get("longevity") != null ? (String) data.get("longevity") : null);
                    artist.setImpact(data.get("impact") != null ? (String) data.get("impact") : null);
                    artist.setDelivery(data.get("delivery") != null ? (String) data.get("delivery") : null);
                    artist.setStorytelling(data.get("storytelling") != null ? (String) data.get("storytelling") : null);
                    artist.setOverallTier(data.get("overallTier") != null ? (String) data.get("overallTier") : "F");
                    artist.setProfileImageUrl(data.get("profileImageUrl") != null ? (String) data.get("profileImageUrl") : null);
                    artist.setActive(data.get("active") != null ? (Boolean) data.get("active") : true);

                    // Handle badges
                    if (data.get("badges") != null) {
                        if (data.get("badges") instanceof List) {
                            artist.setBadges((List<String>) data.get("badges"));
                        } else if (data.get("badges") instanceof String) {
                            String badgesStr = (String) data.get("badges");
                            List<String> badges = new ArrayList<>();
                            for (String badge : badgesStr.split(",")) {
                                if (!badge.trim().isEmpty()) {
                                    badges.add(badge.trim());
                                }
                            }
                            artist.setBadges(badges);
                        }
                    } else {
                        artist.setBadges(new ArrayList<>());
                    }

                    Artist created = artistService.createArtist(artist);
                    createdArtists.add(created);
                } catch (Exception e) {
                    errors.add("Row " + (i + 1) + ": " + e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                    "success", createdArtists.size(),
                    "errors", errors.size(),
                    "errorDetails", errors,
                    "artists", createdArtists
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/import-csv")
    public ResponseEntity<?> importFromCsv(@RequestBody Map<String, Object> data) {
        try {
            String csvContent = (String) data.get("csvContent");
            List<Artist> createdArtists = new ArrayList<>();
            List<String> errors = new ArrayList<>();

            String[] lines = csvContent.split("\n");
            if (lines.length < 2) {
                return ResponseEntity.badRequest().body(Map.of("error", "CSV must have headers and at least one data row"));
            }

            String[] headers = lines[0].split(",");

            for (int i = 1; i < lines.length; i++) {
                try {
                    String line = lines[i].trim();
                    if (line.isEmpty()) continue;

                    String[] values = line.split(",");
                    Artist artist = new Artist();

                    for (int j = 0; j < headers.length && j < values.length; j++) {
                        String header = headers[j].trim().toLowerCase();
                        String value = values[j].trim();

                        switch (header) {
                            case "name":
                                artist.setName(value);
                                break;
                            case "bio":
                                artist.setBio(value);
                                break;
                            case "lyricism":
                                artist.setLyricism(value);
                                break;
                            case "flow":
                                artist.setFlow(value);
                                break;
                            case "creativity":
                                artist.setCreativity(value);
                                break;
                            case "rhythm":
                                artist.setRhythm(value);
                                break;
                            case "longevity":
                                artist.setLongevity(value);
                                break;
                            case "impact":
                                artist.setImpact(value);
                                break;
                            case "delivery":
                                artist.setDelivery(value);
                                break;
                            case "storytelling":
                                artist.setStorytelling(value);
                                break;
                            case "overalltier":
                                artist.setOverallTier(value);
                                break;
                            case "profileimageurl":
                                artist.setProfileImageUrl(value);
                                break;
                            case "badges":
                                List<String> badges = new ArrayList<>();
                                for (String badge : value.split(";")) {
                                    if (!badge.trim().isEmpty()) {
                                        badges.add(badge.trim());
                                    }
                                }
                                artist.setBadges(badges);
                                break;
                        }
                    }

                    if (artist.getName() == null || artist.getName().isEmpty()) {
                        errors.add("Row " + (i + 1) + ": Name is required");
                        continue;
                    }

                    if (artist.getOverallTier() == null) {
                        artist.setOverallTier("F");
                    }

                    if (artist.getBadges() == null) {
                        artist.setBadges(new ArrayList<>());
                    }

                    Artist created = artistService.createArtist(artist);
                    createdArtists.add(created);
                } catch (Exception e) {
                    errors.add("Row " + (i + 1) + ": " + e.getMessage());
                }
            }

            return ResponseEntity.ok(Map.of(
                    "success", createdArtists.size(),
                    "errors", errors.size(),
                    "errorDetails", errors,
                    "artists", createdArtists
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}