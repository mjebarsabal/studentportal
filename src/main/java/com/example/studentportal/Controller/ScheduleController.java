package com.example.studentportal.Controller;

import com.example.studentportal.Entity.Schedule;
import com.example.studentportal.Repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/schedules")
public class ScheduleController {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @GetMapping
    public Iterable<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleById(@PathVariable Long id) {
        Optional<Schedule> schedule = scheduleRepository.findById(id);
        return schedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Schedule addSchedule(@RequestBody Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable Long id, @RequestBody Schedule updatedSchedule) {
        return scheduleRepository.findById(id)
                .map(schedule -> {
                    schedule.setSchoolYear(updatedSchedule.getSchoolYear());
                    schedule.setSemester(updatedSchedule.getSemester());
                    schedule.setProgramCode(updatedSchedule.getProgramCode());
                    schedule.setSection(updatedSchedule.getSection());
                    schedule.setCourseCode(updatedSchedule.getCourseCode());
                    schedule.setDescription(updatedSchedule.getDescription());
                    schedule.setLectureHours(updatedSchedule.getLectureHours());
                    schedule.setLaboratoryHours(updatedSchedule.getLaboratoryHours());
                    schedule.setUnits(updatedSchedule.getUnits());
                    schedule.setDay(updatedSchedule.getDay());
                    schedule.setTime(updatedSchedule.getTime());
                    schedule.setRoom(updatedSchedule.getRoom());
                    schedule.setFacultyName(updatedSchedule.getFacultyName());
                    return ResponseEntity.ok(scheduleRepository.save(schedule));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        if (scheduleRepository.existsById(id)) {
            scheduleRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
} 