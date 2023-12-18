    package hr.fer.progi.forAllTheDogsbackend.color.service

    import hr.fer.progi.forAllTheDogsbackend.color.controller.dto.AddColorDTO
    import hr.fer.progi.forAllTheDogsbackend.color.controller.dto.ColorDTO
    import hr.fer.progi.forAllTheDogsbackend.color.repository.ColorRepository
    import org.springframework.stereotype.Service
    import org.springframework.transaction.annotation.Transactional

    @Service
    class ColorService(private val colorRepository: ColorRepository) {

        fun getAllColors(): List<ColorDTO> = colorRepository.findAll().map { ColorDTO(it) }

        @Transactional
        fun addColor(dto: AddColorDTO): ColorDTO {
            val maxId = colorRepository.findMaxColorId() ?: 0
            val nextId = maxId + 1
            val newColor = dto.toColor(nextId)
            return ColorDTO(colorRepository.save(newColor))
        }
    }