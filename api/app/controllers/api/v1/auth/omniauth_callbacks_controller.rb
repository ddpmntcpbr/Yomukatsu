class Api::V1::Auth::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  def redirect_callbacks
    super
  end

  def omniauth_success
    super
  end

  def omniauth_failure
    super
  end

  protected
  def assign_provider_attrs(user, auth_hash)
    case auth_hash['provider']
    when 'twitter'
      user.assign_attributes({
        nickname: auth_hash['info']['nickname'],
        name: auth_hash['info']['name'],
        image: auth_hash['info']['image'],
        email: auth_hash['info']['email']
      })
    else
      super
    end
  end

  def render_data_or_redirect(message, data, user_data = {})
    if Rails.env.production?
      if ['inAppBrowser', 'newWindow'].include?(omniauth_window_type)
        render_data(message, user_data.merge(data))
      elsif auth_origin_url
        redirect_to DeviseTokenAuth::Url.generate(auth_origin_url, data.merge(blank: true))
      else
        fallback_render data[:error] || 'An error occurred'
      end
    else
      # @resource.credentials = auth_hash["credentials"]

      # わかりやすい様に開発時はjsonとして結果を返す
      render json: @resource, status: :ok
    end
  end

end
