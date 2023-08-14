import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {API_KEY_HEADER} from "../constants";

@Injectable()
export class ApikeyAuthGuard extends AuthGuard(API_KEY_HEADER) {}