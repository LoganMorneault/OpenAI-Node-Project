import { Application } from "express";

export interface IController {

    // in api/'wikipedia'/summarize, 'wikipedia'
    readonly urlPrefix: string;

    /** Attaches this controller to the provided application */
    attach(app: Application): void;
}