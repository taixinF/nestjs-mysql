import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//一对一关系
@Entity({ name: 'user_profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  dob: string;
}
