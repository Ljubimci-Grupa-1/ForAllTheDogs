package hr.fer.progi.forAllTheDogsbackend.activity.repository

import hr.fer.progi.forAllTheDogsbackend.activity.entity.Activity
import org.springframework.data.jpa.repository.JpaRepository

interface ActivityRepository: JpaRepository<Activity, Long> {
}