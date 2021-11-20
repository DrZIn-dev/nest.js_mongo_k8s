import { configService } from '@/config/config.service';
import { Member } from '@/model/member.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private readonly memberRepo: Repository<Member>,
  ) {}

  public async create(memberDto: CreateMemberDto): Promise<string> {
    const hashPassword = await bcrypt.hash(
      memberDto.password,
      configService.getSaltRounds(),
    );
    const newMember = new Member();
    newMember.username = memberDto.username;
    newMember.name = memberDto.name;
    newMember.password = hashPassword;
    const insertResult = await this.memberRepo.save(newMember);
    return insertResult.id;
  }

  public async findByUsername(
    username: CreateMemberDto['username'],
  ): Promise<Member> {
    return this.memberRepo.findOne({ where: { username } });
  }
}
