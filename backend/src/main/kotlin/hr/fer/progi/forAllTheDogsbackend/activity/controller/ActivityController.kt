package hr.fer.progi.forAllTheDogsbackend.activity.controller

import hr.fer.progi.forAllTheDogsbackend.activity.service.ActivityService
import org.springframework.stereotype.Controller

@Controller
class ActivityController(private val activityService: ActivityService) {
}