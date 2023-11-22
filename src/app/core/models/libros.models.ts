import { Editorial } from 'src/app/core/models/editorial';
import { Autor } from "./autor.models";
import { Categoria } from "./categoria.models";

export class Libros {
    asin: number;
    titulo: string = '';
    lanzamiento: Date;
    descripcion: string = '';
    idioma: string = '';
    paginas: number = 0;
    portada: string = '';
    id_autor: Autor;
    id_categoria: Categoria;
    id_editorial :Editorial;
}

