import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as process from 'process';
import axios from "axios";

@Injectable()
export class TranslateService {
    constructor() {}

    async translate(text: string, langFrom: string, langTo: string): Promise<any> {
        if (!text || !langFrom || !langTo) {
            return {
                error: 'Error translation 1'
            }
        }
        try {
            const token = await this.getToken();
            const {data} = await axios.post('https://translate.api.cloud.yandex.net/translate/v2/translate', {
                "sourceLanguageCode": langFrom,
                "targetLanguageCode": langTo,
                "format": "PLAIN_TEXT",
                "texts": [
                    text
                ],
                "folderId": "b1gcs077ahtpjasc93gc",
                "speller": true
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            return data;
        } catch (error) {
            return {
                error: 'Error translation request'
            }
        }
    }

    async getToken() {
        const {data} = await axios.post('https://iam.api.cloud.yandex.net/iam/v1/tokens', {
            yandexPassportOauthToken: process.env.YANDEX_API_KEY
        })
        return data.iamToken;
    }
}
