package com.thornstack.homeops.tasks.api;

public record TaskAssigneeResponse(
    String householdMemberId,
    String displayName
) {}
