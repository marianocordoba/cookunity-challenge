DO $$ BEGIN
 CREATE TYPE "public"."rarity" AS ENUM('common', 'uncommon', 'rare');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."stage" AS ENUM('basic', 'stage1', 'stage2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'steel', 'fairy');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" integer NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar NOT NULL,
	"image" varchar NOT NULL,
	"type" "type" NOT NULL,
	"hp" integer NOT NULL,
	"attack" integer NOT NULL,
	"rarity" "rarity" NOT NULL,
	"stage" "stage" DEFAULT 'basic' NOT NULL,
	"weakness" "type",
	"resistance" "type",
	"shiny" boolean DEFAULT false NOT NULL,
	"foil" boolean DEFAULT false NOT NULL
);
