package com.hiphoproster.service;

import com.hiphoproster.model.Artist;
import com.hiphoproster.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final ArtistRepository artistRepository;

    public List<Artist> getAllArtists() {
        return artistRepository.findAll();
    }

    public Optional<Artist> getArtistById(Long id) {
        return artistRepository.findById(id);
    }

    public Optional<Artist> getArtistByName(String name) {
        return artistRepository.findByName(name);
    }

    public Artist createArtist(Artist artist) {
        return artistRepository.save(artist);
    }

    public Artist updateArtist(Long id, Artist artistDetails) {
        Artist artist = artistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Artist not found"));

        artist.setName(artistDetails.getName());
        artist.setBio(artistDetails.getBio());
        artist.setLyricism(artistDetails.getLyricism());
        artist.setFlow(artistDetails.getFlow());
        artist.setCreativity(artistDetails.getCreativity());
        artist.setRhythm(artistDetails.getRhythm());
        artist.setLongevity(artistDetails.getLongevity());
        artist.setImpact(artistDetails.getImpact());
        artist.setDelivery(artistDetails.getDelivery());
        artist.setStorytelling(artistDetails.getStorytelling());
        artist.setOverallTier(artistDetails.getOverallTier());
        artist.setBadges(artistDetails.getBadges());
        artist.setProfileImageUrl(artistDetails.getProfileImageUrl());

        return artistRepository.save(artist);
    }

    public void deleteArtist(Long id) {
        artistRepository.deleteById(id);
    }

    public List<Artist> getArtistsByTier(String tier) {
        return artistRepository.findByOverallTier(tier);
    }
}