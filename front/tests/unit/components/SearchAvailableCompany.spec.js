jest.mock('@/services/Api', () => {
  return {
    search: jest.fn()
  }
})

import { mount } from '@vue/test-utils'

import App from '@/App.vue'
import Api from '@/services/Api'

describe('components/SearchAvailableCompany.vue', () => {
  it('renders a success message about company name availability', async () => {
    const name = '4 FIT'
    Api.search.mockImplementationOnce(() => {
      return Promise.resolve({ result: 'available' })
    })
    const wrapper = mount(App)
    wrapper.find(`[data-input='Criteria']`).setValue('4 FIT')
    await wrapper.find(`[data-trigger='Search']`).trigger('click')
    expect(
      await wrapper.find(`[data-output='MessageSuccess']`).text()
    ).toBe(`${name} is available!`)
    expect(Api.search).toHaveBeenCalledWith(name)
  })

  it('renders an unsuccess message about company name availability', async () => {
    const name = '2008 LTD'
    const code = 'NI041208'
    Api.search.mockImplementationOnce(criteria => {
      return Promise.resolve({ result: code })
    })
    const wrapper = mount(App)
    wrapper.find(`[data-input='Criteria']`).setValue(name)
    await wrapper.find(`[data-trigger='Search']`).trigger('click')
    expect(await wrapper.find(`[data-output='MessageAlert']`).text()).toBe(
      `${name} is not available! It has ${code} code.`
    )
    expect(Api.search).toHaveBeenCalledWith(name)
  })
})
