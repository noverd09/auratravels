/**
 * Composition root: the only file that knows which implementation is in use.
 * To move to Supabase, swap the Mock* classes for Supabase* classes here.
 */
import { MockContactRepository } from "@/lib/contact/mock-repository";
import { MockDestinationRepository } from "@/lib/destinations/mock-repository";
import { MockInquiryRepository } from "@/lib/inquiries/mock-repository";
import { MockJournalRepository } from "@/lib/journal/mock-repository";
import { MockTravelStyleRepository } from "@/lib/travel-styles/mock-repository";
import { MockTripRepository } from "@/lib/trips/mock-repository";

export const destinationRepository = new MockDestinationRepository();
export const tripRepository = new MockTripRepository();
export const journalRepository = new MockJournalRepository();
export const travelStyleRepository = new MockTravelStyleRepository();
export const inquiryRepository = new MockInquiryRepository();
export const contactRepository = new MockContactRepository();
