import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  static async build(params) {
    const entity = new this();
    Object.keys(params).forEach(key => {
      entity[key] = params[key];
    });
    await entity.save();
    return await this.findOne(entity.id);
  }

  static async findOrCreateBy(params) {
    const entity = await this.findOne(params);
    if (entity !== undefined) {
      return entity;
    }
    return await this.build(params);
  }

  static async exists(params) {
    const entity = await this.findOne(params);
    return entity !== undefined;
  }
}