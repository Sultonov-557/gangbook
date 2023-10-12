import { DocumentBuilder } from "@nestjs/swagger";
export const config = new DocumentBuilder()
  .setTitle("gangbook")
  .setDescription("a")
  .setVersion("1.0")
  .addTag("a")
  .build();
