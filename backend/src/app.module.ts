import { Module } from '@nestjs/common';
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./auth/auth.guard";
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Users} from "./users/users.model";
import {AuthModule} from "./auth/auth.module";
import {Word} from "./words/word/word.model";
import {WordCategory} from "./category/word-category";
import {WordModule} from "./words/word/word.module";
import {CategoryModule} from "./category/category.module";
import {Category} from "./category/category.model";
import {SentenceCategory} from "./category/sentence-category";
import {Sentence} from "./sentences/sentense/sentence.model";
import {SentenceModule} from "./sentences/sentense/sentence.module";
import {TranslateModule} from "./translate/translate.module";

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
        Sentence,
        Word,
        WordCategory,
        SentenceCategory,
        Category,
      ],
      autoLoadModels: true,
      logging: false,
      synchronize: true,
    }),
    AuthModule,
    WordModule,
    CategoryModule,
    SentenceModule,
    TranslateModule,
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
