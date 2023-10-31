import { Request } from 'express';
import { HttpCodes, RestApiException } from '../exceptions';
import { BaseService } from './base-service';

export abstract class BaseController<T> {
  private readonly service: BaseService<T>;

  constructor (service: BaseService<T>) {
    this.service = service;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get ({ params }: Request): Promise<T> {
    const doc = await this.service.get(params.id);
    if (!doc) {
      throw new RestApiException('Document not found', HttpCodes.NotFound);
    }

    return doc;
  }

  async getAll (): Promise<T[]> {
    return this.service.getAll();
  }

  async create ({ body }: Request): Promise<T> {
    return this.service.create(body);
  }

  async update ({ body }: Request): Promise<T> {
    const doc = await this.service.update(body);
    if (!doc) {
      throw new RestApiException('Document not found', HttpCodes.NotFound);
    }

    return doc;
  }

  async delete ({ params }: Request): Promise<T> {
    const doc = await this.service.delete(params.id);
    if (!doc) {
      throw new RestApiException('Document not found', HttpCodes.NotFound);
    }

    return doc;
  }
}
