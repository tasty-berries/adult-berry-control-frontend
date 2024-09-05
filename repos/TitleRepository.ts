import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class TitleRepository extends Repository {
    public index(request: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => '/titles?' + querify(request()).toString());
    }

    public show(id: number) {
        return this.client.get<Resource<any>>(`/titles/${id}`);
    }

    public update(data: any) {
        const characters: any = {};

        data.characters.forEach((character: any) => characters[character.id] = character.role);

        return this.client.put(`/titles/${data.id}`, {
            ...data,
            characters: characters,
            preview: data.preview instanceof File ? data.preview : null
        }, true);
    }
}
