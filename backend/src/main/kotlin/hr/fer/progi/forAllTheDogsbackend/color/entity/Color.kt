package hr.fer.progi.forAllTheDogsbackend.color.entity

import hr.fer.progi.forAllTheDogsbackend.pet.entity.Pet
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull

@Entity
class Color (

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "color_seq")
    @SequenceGenerator(name = "color_seq", sequenceName = "color_seq", allocationSize = 1)
    @Column(name = "colorid")
    var colorId: Long = 0L,

    @Column(unique = true, name = "colorname")
    @NotNull
    var colorName: String,

    @ManyToMany(mappedBy = "colors")
    var pets: MutableSet<Pet> = mutableSetOf()

)