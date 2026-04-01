import { pgTable, serial, text, integer, boolean, timestamp, numeric, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ── Users / Auth ───────────────────────────────────────────────────────────
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("user"), // 'admin' | 'staff' | 'user'
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;

// ──────────────────────────────────────────────────────────────────────────
export const companyRegistrationsTable = pgTable("company_registrations", {
  id: serial("id").primaryKey(),
  accountNumber: text("account_number").unique(),
  companyName: text("company_name").notNull(),
  commercialRegister: text("commercial_register"),
  city: text("city").notNull(),
  address: text("address"),
  branchCount: integer("branch_count"),
  activityType: text("activity_type"),
  contactName: text("contact_name").notNull(),
  jobTitle: text("job_title"),
  department: text("department"),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  authorizationConfirmed: boolean("authorization_confirmed").default(false),
  agreementConfirmed: boolean("agreement_confirmed").default(false),
  requestedServices: text("requested_services"),
  currentVendors: text("current_vendors"),
  operationVolume: text("operation_volume"),
  collaborationModel: text("collaboration_model").notNull(),
  selectedPackage: text("selected_package"),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertCompanyRegistrationSchema = createInsertSchema(companyRegistrationsTable).omit({ id: true, createdAt: true });
export type InsertCompanyRegistration = z.infer<typeof insertCompanyRegistrationSchema>;
export type CompanyRegistration = typeof companyRegistrationsTable.$inferSelect;

export const vendorRegistrationsTable = pgTable("vendor_registrations", {
  id: serial("id").primaryKey(),
  vendorType: text("vendor_type").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  services: text("services"),
  serviceScope: text("service_scope").notNull(),
  financialModelAccepted: boolean("financial_model_accepted").default(false),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVendorRegistrationSchema = createInsertSchema(vendorRegistrationsTable).omit({ id: true, createdAt: true });
export type InsertVendorRegistration = z.infer<typeof insertVendorRegistrationSchema>;
export type VendorRegistration = typeof vendorRegistrationsTable.$inferSelect;

export const consultantRegistrationsTable = pgTable("consultant_registrations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  expertiseArea: text("expertise_area").notNull(),
  contributionType: text("contribution_type"),
  yearsOfExperience: integer("years_of_experience"),
  revenueModelAccepted: boolean("revenue_model_accepted").default(false),
  status: text("status").notNull().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConsultantRegistrationSchema = createInsertSchema(consultantRegistrationsTable).omit({ id: true, createdAt: true });
export type InsertConsultantRegistration = z.infer<typeof insertConsultantRegistrationSchema>;
export type ConsultantRegistration = typeof consultantRegistrationsTable.$inferSelect;

export const contactMessagesTable = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessagesTable).omit({ id: true, createdAt: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessagesTable.$inferSelect;

export const serviceRequestsTable = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull().default("pending"),
  serviceType: text("service_type").notNull(),
  companyId: integer("company_id"),
  vendorId: integer("vendor_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertServiceRequestSchema = createInsertSchema(serviceRequestsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertServiceRequest = z.infer<typeof insertServiceRequestSchema>;
export type ServiceRequest = typeof serviceRequestsTable.$inferSelect;

export const consultationsTable = pgTable("consultations", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull().default("active"),
  linkedCompany: text("linked_company").notNull(),
  consultantId: integer("consultant_id"),
  rewardAmount: numeric("reward_amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertConsultationSchema = createInsertSchema(consultationsTable).omit({ id: true, createdAt: true });
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultationsTable.$inferSelect;
