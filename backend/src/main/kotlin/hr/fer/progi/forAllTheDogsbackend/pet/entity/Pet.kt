package hr.fer.progi.forAllTheDogsbackend.pet.entity

import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import java.util.*

@Entity
class Pet (
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @SequenceGenerator(name = "pet_seq", sequenceName = "pet_seq", allocationSize = 1)
    var petId: Long = 0L,

    @ManyToOne
    var species: Species,

    var petName: String,

    var age: Int,

    @ManyToMany(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinTable(
        name = "of_color",
        joinColumns = [JoinColumn(name = "pet_id")],
        inverseJoinColumns = [JoinColumn(name = "color_id")]
    )
    var colors: MutableSet<Color> = mutableSetOf(),

    var dateMissing: Date,

    var hourMissing: Int,

    @NotNull
    var description: String

)