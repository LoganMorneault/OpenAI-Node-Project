import config from "../config.json"

export class ConfigService {
    public readonly PORT_NUMBER = config["PORT_NUMBER"];
    public readonly DEFAULT_MODEL = config["OPENAI"]["DEFAULT_MODEL"];
    public readonly DEFAULT_TEMPERATURE = config["OPENAI"]["DEFAULT_TEMPERATURE"];
    public readonly DEFAULT_MAX_TOKENS = config["OPENAI"]["DEFAULT_MAX_TOKENS"];
    public readonly OPENAI_API_URL = config["OPENAI"]["API_URL"];
    public readonly OPENAI_API_SECRET_KEY = config["OPENAI"]["API_SECRET_KEY"];
}