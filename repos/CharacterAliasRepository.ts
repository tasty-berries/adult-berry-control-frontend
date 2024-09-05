import Repository from "~/repos/Repository";
import type SearchableRepository from "~/types/repos/SearchableRepository";
import type Collection from "~/types/Collection";

export default class CharacterAliasRepository extends Repository implements SearchableRepository {
    private readonly characterId: number;

    constructor(characterId: number) {
        super();
        this.characterId = characterId;
    }

    public index() {
        return this.client.getData<Collection<any>>(`character.${this.characterId}.aliases`, `/characters/${this.characterId}/aliases`);
    }

    public store(data: any): Promise<void> {
        return this.client.post<void>(`/characters/${this.characterId}/aliases`, {
            ...data,
            character_id: data.character.id
        });
    }

    public update(data: any) {
        return this.client.put(`/characters/${data.id}`, {
            ...data,
            preview: data.preview instanceof File ? data.preview : null
        }, true);
    }

    public destroy(id: number): Promise<void> {
        return this.client.delete<void>(`/characters/${this.characterId}/aliases/${id}`);
    }

    public search(query: string): Promise<Collection<any>> {
        return this.client.get<Collection<any>>(`/characters/${this.characterId}/aliases/search?` + querify({query}).toString());
    }
}
