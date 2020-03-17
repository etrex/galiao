import {Entity, Column} from "typeorm";
import Base from "./base";

@Entity()
export class subscriptions extends Base{
  @Column()
  session_id: string;

  @Column()
  token: string;
}
