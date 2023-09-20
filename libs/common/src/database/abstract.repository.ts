import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AsbtractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';




export abstract class AbstractRepository<TDocument extends AsbtractDocument> {
    protected abstract readonly logger : Logger;
    constructor(protected readonly model : Model<TDocument>){}

    async create(document : Omit<TDocument , "_id">) : Promise<TDocument> {
        const createdDocument = new this.model({
            ...document ,
            _id : new  Types.ObjectId(),
        });

        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {},{lean: true});
        if(!document){
            this.logger.warn("document not found with filter query !");
            throw new NotFoundException("document not found !");
        }

        return document as TDocument;
    }

    async findOneAndUpdate(
        filterQuey : FilterQuery<TDocument> , 
        update: UpdateQuery<TDocument>) : Promise<TDocument>{
            const document = await this.model.findOneAndUpdate(filterQuey , update, {
                lean: true,
                new: true
            });
            if(!document){
                this.logger.warn("no document to update ");
                throw new NotFoundException("no document found to update !");
            }
            return document as TDocument;
    }

    async findAll(filterQuery : FilterQuery<TDocument>): Promise<TDocument[]> {
        return await this.model.find(filterQuery,{ },{lean: true}) as TDocument[];
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>) :Promise<TDocument> {
        return await this.model.findByIdAndDelete(filterQuery, {lean : true} ) as TDocument;
    }

}