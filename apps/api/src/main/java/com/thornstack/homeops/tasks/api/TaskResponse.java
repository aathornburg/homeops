package com.thornstack.homeops.tasks.api;

import tools.jackson.databind.JsonNode;

import java.time.Instant;
import java.time.LocalDate;

public record TaskResponse(
    String taskId,
    String title,
    TaskStatus status,
    TaskAssigneeResponse assignee,
    TaskProjectResponse	project,
    boolean	isBlocked,
    String blockedDescription,
    LocalDate dueDate,
    LocalDate scheduledDate,
    Instant completedAt,
    Instant archivedAt,
    Instant cancelledAt,
    TaskCapabilitiesResponse capabilities,
    JsonNode instructions
) {}
