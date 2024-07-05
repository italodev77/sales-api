import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import { request } from 'http';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const listProduct = new ListProductService();

        const product = await listProduct.execute();
        return response.json(product);
    }
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showProduct = new ShowProductService();

        const product = await showProduct.execute({ id });

        return response.json(product);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const deleteProduct = new DeleteProductService();

        const product = await deleteProduct.execute({ id });

        return response.json([]);
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProduct = await new CreateProductService();

        const product = createProduct.execute({ name, price, quantity });

        return response.json(product);
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, price, quantity } = request.body;
        const { id } = request.params;

        const updateProduct = new UpdateProductService();

        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity,
        });

        return response.json(product);
    }
}
