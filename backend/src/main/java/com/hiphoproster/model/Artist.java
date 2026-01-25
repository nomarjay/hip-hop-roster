package com.hiphoproster.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "artists")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Artist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Artist name is required")
    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 1000)
    private String bio;

    // Stats (graded A+ to F-)
    private String lyricism;
    private String flow;
    private String creativity;
    private String rhythm;
    private String longevity;
    private String impact;
    private String delivery;
    private String storytelling;

    // Overall tier (S, A, B, C, D, E, F)
    @Column(nullable = false)
    private String overallTier = "F";

    // Badges
    @ElementCollection
    @CollectionTable(name = "artist_badges", joinColumns = @JoinColumn(name = "artist_id"))
    @Column(name = "badge")
    private List<String> badges = new ArrayList<>();

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "active")
    private boolean active = true;
}
