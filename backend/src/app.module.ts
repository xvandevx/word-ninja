import { Module } from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth/auth.guard";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Users} from "./users/users.model";
import {AuthModule} from "./auth/auth.module";
import {Word} from "./words/word/word.model";
import {WordCategory} from "./category/word-category";
import {WordTranslation} from "./words/translation/word-translation";
import {WordModule} from "./words/word/word.module";
import {WordTranslationModule} from "./words/translation/translation.module";
import {CategoryModule} from "./category/category.module";
import {Translation} from "./words/translation/translation.model";
import {Category} from "./category/category.model";
import {SentenceCategory} from "./category/sentence-category";
import {Sentence} from "./sentences/sentense/sentence.model";

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
        SentenceCategory,
        Category,
        Sentence,
        Word,
      ],
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
    AuthModule,
    WordModule,
    CategoryModule,
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
