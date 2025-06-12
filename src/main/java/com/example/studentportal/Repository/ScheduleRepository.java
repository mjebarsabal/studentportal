package com.example.studentportal.Repository;

import org.springframework.data.repository.CrudRepository;
import com.example.studentportal.Entity.Schedule;

public interface ScheduleRepository extends CrudRepository<Schedule, Long> {
} 