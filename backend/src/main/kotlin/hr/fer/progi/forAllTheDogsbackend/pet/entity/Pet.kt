package hr.fer.progi.forAllTheDogsbackend.pet.entity

import hr.fer.progi.forAllTheDogsbackend.city.entity.City
import hr.fer.progi.forAllTheDogsbackend.color.entity.Color
import hr.fer.progi.forAllTheDogsbackend.location.entity.Location
import hr.fer.progi.forAllTheDogsbackend.species.entity.Species
import jakarta.persistence.*
import org.jetbrains.annotations.NotNull
import java.time.LocalDateTime
import java.util.*

@Entity
class Pet (
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pet_seq")
    @SequenceGenerator(name = "pet_seq", sequenceName = "pet_seq", allocationSize = 1)
    @Column(name = "petid")
    var petId: Long = 0L,

    @ManyToOne
    @NotNull
    @JoinColumn(name = "speciesid")
    var species: Species,

    @Column(name = "petname")
    var petName: String,

    @Column(name = "petage")
    var age: Int,

    @ManyToMany(cascade = [CascadeType.PERSIST, CascadeType.MERGE])
    @JoinTable(
        name = "of_color",
        joinColumns = [JoinColumn(name = "petid")],
        inverseJoinColumns = [JoinColumn(name = "colorid")]
    )
    var colors: MutableSet<Color> = mutableSetOf(),

    @Column(name = "datetimemissing")
    var dateTimeMissing: LocalDateTime,

    @NotNull
    var description: String,

    @ManyToOne
    @NotNull
    @JoinColumn(name = "locationid")
    var location: Location
)