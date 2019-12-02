jest.mock('@/services/Api', () => {
  return {
    search: jest.fn()
  }
})

import { mount } from "@vue/test-utils"

import App from "@/App.vue"
import Api from "@/services/Api"

describe("components/SearchAvailableCompany.vue", () => {
  it("renders a success message about company name availability", async () => {
    Api.search.mockImplementationOnce((criteria) => {
      return Promise.resolve({ result: 'available' })
    })
    const wrapper = mount(App)
    wrapper.find(`[data-input='Criteria']`).setValue('Company Name')
    await wrapper.find(`[data-trigger='Search']`).trigger('click')
    expect(await wrapper.find(`[data-output='MessageSuccess']`).text())
      .toContain('Company Name is available!')
    expect(Api.search).toHaveBeenCalledWith('Company Name')
  })

  it("renders an unsuccess message about company name availability", async () => {
    Api.search.mockImplementationOnce((criteria) => {
      return Promise.resolve({ result: [criteria] })
    })
    const wrapper = mount(App)
    wrapper.find(`[data-input='Criteria']`).setValue('Company Name')
    await wrapper.find(`[data-trigger='Search']`).trigger('click')
    expect(await wrapper.find(`[data-output='MessageAlert']`).text())
      .toContain('Company Name is not available!')
    expect(Api.search).toHaveBeenCalledWith('Company Name')
  })
})