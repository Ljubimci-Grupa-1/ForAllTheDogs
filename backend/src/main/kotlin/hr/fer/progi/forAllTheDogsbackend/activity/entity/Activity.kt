package hr.fer.progi.forAllTheDogsbackend.activity.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import org.jetbrains.annotations.NotNull


@Entity
class Activity(
    @Id
    @GeneratedValue
    var activityId:Long,

    var activityCategory: String
)