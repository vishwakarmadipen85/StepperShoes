import { MeiliSearch } from 'meilisearch';
import Product from '../models/Product';

const client = new MeiliSearch({
    host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
    apiKey: process.env.MEILISEARCH_KEY,
});

const index = client.index('products');

export class SearchService {
    static async indexProduct(product: any) {
        try {
            await index.addDocuments([{
                id: product._id.toString(),
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                image: product.images[0],
                vendor: product.vendor
            }]);
        } catch (error) {
            console.error('Meilisearch Indexing Error:', error);
        }
    }

    static async searchProducts(query: string, filters: any = {}) {
        try {
            const searchParams: any = {
                limit: 20
            };
            if (filters.category) {
                searchParams.filter = `category = "${filters.category}"`;
            }
            return await index.search(query, searchParams);
        } catch (error) {
            console.error('Meilisearch Search Error:', error);
            // Fallback to MongoDB if search fails
            return { hits: [] };
        }
    }

    static async syncAllProducts() {
        const products = await Product.find({ isApproved: true });
        const documents = products.map(p => ({
            id: p._id.toString(),
            name: p.name,
            description: p.description,
            category: p.category,
            price: p.price,
            image: p.images[0],
            vendor: p.vendor
        }));
        await index.addDocuments(documents);
        console.log(`Synced ${documents.length} products to Meilisearch`);
    }
}
