import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import config from './config';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Import and provide app configuration related classes.
 * 
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            validationSchema: Joi.object({
                APP_NAME: Joi.string().default('nestjs-auth'),
                APP_ENV: Joi.string()
                    .valid('development', 'production', 'test', 'provision')
                    .default('development'),
                APP_URL: Joi.string().default('http://localhost:3010'),
                APP_PORT: Joi.number().default(3010),
            }),
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {};