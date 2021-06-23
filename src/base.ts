import Command, {flags} from '@oclif/command'

export default abstract class extends Command {

  async catch(err: any) {
    return super.catch(err);
  }
}