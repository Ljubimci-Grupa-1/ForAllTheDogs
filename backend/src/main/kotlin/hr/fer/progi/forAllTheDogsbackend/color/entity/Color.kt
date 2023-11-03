package hr.fer.progi.forAllTheDogsbackend.color.entity

import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToMany
import org.jetbrains.annotations.NotNull

@Entity
class Color (

    @Id
    @GeneratedValue
    var colorId: Long = 0L,

    @Column(unique = true)
    @NotNull
    var colorName: String,

    @ManyToMany(mappedBy = "colors")
    var pets: MutableSet<Pet> = mutableSetOf()

)