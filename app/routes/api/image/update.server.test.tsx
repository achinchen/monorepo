import getContext from 'spec/utils/getContext';
import { json, unstable_parseMultipartFormData } from '@remix-run/node';
import uploadImage from '~/utils/imgur/image/upload.server';
import { action } from './update';

const mock = {
  request: new Request('', { method: 'DELETE' })
};

const context = getContext({ request: mock.request });

jest.mock('~/utils/imgur/image/upload.server');

describe('upload image', () => {
  it('trigger unstable_parseMultipartFormData', async () => {
    await action(context);
    expect(unstable_parseMultipartFormData).toBeCalled();
  });

  it('trigger uploadImage', async () => {
    await action(context);
    expect(uploadImage).toBeCalled();
  });

  it('uploadImage failed: return 500', async () => {
    (uploadImage as jest.Mock).mockReturnValue(null);

    await action(context);
    expect(json).toBeCalledWith(null, 500);
  });

  it('uploadImage succeed: return 500', async () => {
    const result = { url: 'https://placeholder.com' };
    (uploadImage as jest.Mock).mockReturnValue(result);

    await action(context);
    expect(json).toBeCalledWith({ url: result.url }, 200);
  });
});
