# Delivery Sathi

## Purpose

An AI agent that talks to COD buyers in their own language so more parcels get delivered and fewer come back.

## Users

- **Primary:** D2C / ecommerce sellers shipping COD in India, especially into tier 2 and 3 cities.
- **Secondary:** Buyers receiving COD parcels; riders making delivery attempts.
- Marketplace-only sellers are politely turned away.

## Jobs

- Confirm the buyer still wants the order after checkout.
- Check someone is home when the parcel is out for delivery; reschedule or fix the address before the rider goes.
- After a failed attempt, learn what happened in the buyer’s words, book a reattempt, or log a no-show claim.

## Mechanism

Sathi speaks Hindi, Hinglish, and English across three moments that decide delivery. Outcomes become actions: reschedule, address fix, UPI link, courier instruction, or no-show claim. Sellers can go live through chat (`@DeliverySathibot` on Telegram) or through the web onboarding form.

## Evidence (from product deck)

- Indian ecommerce still runs heavily on COD (deck cites 60–65%).
- First-attempt failure rises outside metros; returns cost roughly ₹180–250 per parcel (deck cites ~₹200).
- Pricing intent: ₹6 per COD order handled, plus ₹20 when a failed attempt is turned into a delivery.

## Constraints

- Website is primarily static and Vercel-hosted.
- Supabase is provisioned in code but not connected yet; onboarding submissions must not require a live database.
- Do not invent customers, logos, or metrics beyond the deck.

## Platform

web

## Stack

Next.js (App Router) on Vercel; Supabase reserved for later.
