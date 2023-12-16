package hr.fer.progi.forAllTheDogsbackend.activity.service

import hr.fer.progi.forAllTheDogsbackend.activity.repository.ActivityRepository
import org.springframework.stereotype.Service

@Service
class ActivityService(private val activityRepository: ActivityRepository) {
}