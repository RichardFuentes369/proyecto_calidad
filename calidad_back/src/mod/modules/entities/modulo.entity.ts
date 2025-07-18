// import { PermisosModulos } from 'src/mod/permisos/modulos/entities/modulo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('mod_permisos_modulo')
export class Modulo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  permiso: string;

  @Column({ default: false })
  tiene_submodulos: boolean;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  modulo_padre_id: number;
  
  @ManyToOne(() => Modulo, { nullable: true })
  @JoinColumn({ name: 'modulo_padre_id' })
  modulo_padre: Modulo;
}
