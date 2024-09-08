import Repository from "~/repos/Repository";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class FilesystemRepository extends Repository {
    public index() {
        return this.client.getData<PaginatedCollection<any>>('filesystem.index', '/filesystem');
    }
}
