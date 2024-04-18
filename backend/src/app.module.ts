import { Module } from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth/auth.guard";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Users} from "./users/users.model";
import {AuthModule} from "./auth/auth.module";
import {Word} from "./words/word/word.model";
import {WordCategory} from "./words/category/word-categoy";
import {WordTranslation} from "./words/translation/word-translation";
import {WordModule} from "./words/word/word.module";
import {WordTranslationModule} from "./words/translation/translation.module";
import {WordCategoryModule} from "./words/category/category.module";
import {Translation} from "./words/translation/translation.model";
import {Category} from "./words/category/category.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.local.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Users,
        WordTranslation,
        Translation,
        WordCategory,
        Category,
        Word,
      ],
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
    AuthModule,
    WordModule,
    WordCategoryModule,
    WordTranslationModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
