package com.cakeshop.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private String paymentIntentId;
    private String status;
    private String message;
    private Long orderId;
}