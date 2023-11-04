package hr.fer.progi.forAllTheDogsbackend.activity.entity

import jakarta.persistence.*


@Entity
class Activity(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_seq")
    @SequenceGenerator(name = "activity_seq", sequenceName = "activity_seq", allocationSize = 1)
    var activityId:Long,

    var activityCategory: String
)