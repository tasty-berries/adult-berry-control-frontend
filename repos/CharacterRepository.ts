import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";
import type SearchableRepository from "~/types/repos/SearchableRepository";
import type Collection from "~/types/Collection";

export default class CharacterRepository extends Repository implements SearchableRepository {
    public index(request: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => '/characters?' + querify(request()).toString());
    }

    public show(id: number) {
        return this.client.get<Resource<any>>(`/characters/${id}`);
    }

    public update(data: any) {
        return this.client.put(`/characters/${data.id}`, {
            ...data,
            preview: data.preview instanceof File ? data.preview : null
        }, true);
    }

    public search(query: string): Promise<Collection<any>> {
        return this.client.get<Collection<any>>('/characters/search?' + querify({query}).toString());
    }
}
